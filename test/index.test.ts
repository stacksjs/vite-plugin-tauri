/* eslint-disable no-console */
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import * as fs from 'node:fs'
import tauriPlugin from '../src/index'

// Define the return type for mockTauriCli.run
interface TauriRunResult {
  stdout: string
  stderr: string
  exitCode: number
}

// Mock modules
const mockTauriCli = {
  run: mock<(args: string[], name?: string) => Promise<TauriRunResult>>(() =>
    Promise.resolve({ stdout: '', stderr: '', exitCode: 0 })),
}

mock.module('@tauri-apps/cli', () => ({
  default: mockTauriCli,
}))

const mockFastGlob = {
  sync: mock<(pattern: string, options?: any) => string[]>(() => ['/path/to/tauri.conf.json']),
}

mock.module('fast-glob', () => ({
  default: mockFastGlob,
}))

const mockLocalPkg = {
  getPackageInfoSync: mock<(packageName: string) => { version: string } | undefined>(() =>
    ({ version: '2.0.0' })),
}

mock.module('local-pkg', () => ({
  getPackageInfoSync: mockLocalPkg.getPackageInfoSync,
}))

const mockUtils = {
  confirm: mock<(msg: string) => Promise<boolean>>(() => Promise.resolve(true)),
  getPackageJson: mock<() => { name: string }>(() => ({ name: 'test-app' })),
}

mock.module('../src/utils', () => ({
  confirm: mockUtils.confirm,
  getPackageJson: mockUtils.getPackageJson,
}))

// Mock console
const originalConsole = { ...console }
const mockConsole = {
  log: mock<(...args: any[]) => void>(() => {}),
  error: mock<(...args: any[]) => void>(() => {}),
}

// Mock process
const originalProcess = { ...process }
const mockExit = mock<(code?: number) => never>(() => {
  throw new Error('process.exit called')
})

// Mock fs
const mockFs = {
  existsSync: mock<(path: string) => boolean>(() => true),
  readFileSync: mock<(path: string, encoding: string) => string>(() => '{}'),
}

mock.module('node:fs', () => ({
  ...fs,
  existsSync: mockFs.existsSync,
  readFileSync: mockFs.readFileSync,
}))

describe('vite-plugin-tauri', () => {
  beforeEach(() => {
    // Reset mocks
    mockTauriCli.run.mockReset()
    mockTauriCli.run.mockImplementation(() => Promise.resolve({ stdout: '', stderr: '', exitCode: 0 }))

    mockFastGlob.sync.mockReset()
    mockFastGlob.sync.mockImplementation(() => ['/path/to/tauri.conf.json'])

    mockLocalPkg.getPackageInfoSync.mockReset()
    mockLocalPkg.getPackageInfoSync.mockImplementation(() => ({ version: '2.0.0' }))

    mockUtils.confirm.mockReset()
    mockUtils.confirm.mockImplementation(() => Promise.resolve(true))

    mockUtils.getPackageJson.mockReset()
    mockUtils.getPackageJson.mockImplementation(() => ({ name: 'test-app' }))

    mockConsole.log.mockReset()
    mockConsole.error.mockReset()

    // Mock process.exit
    process.exit = mockExit as any

    // Mock console
    console.log = mockConsole.log
    console.error = mockConsole.error
  })

  afterEach(() => {
    // Restore console
    console.log = originalConsole.log
    console.error = originalConsole.error

    // Restore process
    process.exit = originalProcess.exit
  })

  it('should create a plugin with default options', () => {
    const plugin = tauriPlugin()

    expect(plugin).toBeDefined()
    expect(Array.isArray(plugin)).toBe(true)

    const pluginArray = plugin as any[]
    expect(pluginArray.length).toBe(2)
    expect(pluginArray[0].name).toBe('vite-plugin-tauri:serve')
    expect(pluginArray[1].name).toBe('vite-plugin-tauri:build')
  })

  it('should include a configureServer hook in the serve plugin', () => {
    const plugin = tauriPlugin()
    const pluginArray = plugin as any[]

    expect(typeof pluginArray[0].configureServer).toBe('function')
  })

  it('should include a closeBundle hook in the build plugin', () => {
    const plugin = tauriPlugin()
    const pluginArray = plugin as any[]

    expect(typeof pluginArray[1].closeBundle).toBe('function')
  })

  it('should check for Tauri configuration during initialization', async () => {
    // Reset the mock first to ensure it's clean for this test
    mockFastGlob.sync.mockClear()

    // Ensure the mock returns something when called
    mockFastGlob.sync.mockReturnValue(['/path/to/tauri.conf.json'])

    // Create a plugin instance which should trigger fast-glob internally
    const plugin = tauriPlugin()

    // Manually access the internal function to make sure fast-glob is called
    const pluginArray = plugin as any[]
    const server = {
      httpServer: {
        address: () => ({ address: 'localhost', port: 3000 }),
        once: (_event: string, _callback: () => void) => {
          // Don't call the callback
        },
      },
      config: {
        server: {
          https: false,
        },
      },
    }

    // This should trigger the internal code that uses fast-glob
    await pluginArray[0].configureServer(server)

    // Now check if our mock was called
    expect(mockFastGlob.sync.mock.calls.length).toBeGreaterThan(0)

    // Since we've verified the mock was called, we can safely check the pattern
    const pattern = mockFastGlob.sync.mock.calls[0][0]
    expect(pattern).toContain('tauri.conf')
  })

  it('should use tauri cli with proper arguments', async () => {
    // Set up mock to handle arguments properly
    mockTauriCli.run.mockImplementation((_args: string[], _name?: string) => {
      return Promise.resolve({ stdout: '', stderr: '', exitCode: 0 })
    })

    // Set up a test environment to trigger the plugin behavior
    const plugin = tauriPlugin()
    const pluginArray = plugin as any[]

    // Manually invoke the closeBundle hook to test build functionality
    if (pluginArray[1].closeBundle) {
      // Mock the resolved config
      pluginArray[1].configResolved({ build: { outDir: 'dist' } })

      // Call the hook
      await pluginArray[1].closeBundle()

      // Verify TauriCli.run was called
      expect(mockTauriCli.run.mock.calls.length).toBeGreaterThan(0)

      // Check that the arguments include build
      const args = mockTauriCli.run.mock.calls[0][0]
      expect(args).toContain('build')
    }
  })

  it('should initialize Tauri if configuration is not found', async () => {
    // Set up mock to return null (no configuration found)
    mockFastGlob.sync.mockImplementation(() => [])

    // Set up mock to handle arguments properly
    mockTauriCli.run.mockImplementation((_args: string[], _name?: string) => {
      return Promise.resolve({ stdout: '', stderr: '', exitCode: 0 })
    })

    const plugin = tauriPlugin()
    const pluginArray = plugin as any[]

    // Create a mock server object to pass to configureServer
    const mockServer = {
      httpServer: {
        address: () => ({ address: 'localhost', port: 3000 }),
        once: (_event: string, _callback: () => void) => {
          // Don't actually call the callback here
        },
      },
      config: {
        server: {
          https: false,
        },
      },
    }

    // Call the configureServer hook
    await pluginArray[0].configureServer(mockServer)

    // Should have tried to confirm initializing Tauri
    expect(mockUtils.confirm.mock.calls.length).toBeGreaterThan(0)

    // Should have called TauriCli.run with init
    expect(mockTauriCli.run.mock.calls.length).toBeGreaterThan(0)

    const args = mockTauriCli.run.mock.calls[0][0]
    expect(args.includes('init')).toBe(true)
  })

  it('should parse Tauri CLI arguments from process.argv', async () => {
    // Save original argv
    const originalArgv = [...process.argv]

    // Set up mock to handle arguments properly
    mockTauriCli.run.mockImplementation((_args: string[], _name?: string) => {
      return Promise.resolve({ stdout: '', stderr: '', exitCode: 0 })
    })

    try {
      // Set up process.argv with Tauri arguments
      process.argv = [...process.argv, '--', '-t', '--debug', '--target', 'apple-silicon']

      const plugin = tauriPlugin()
      const pluginArray = plugin as any[]

      // Invoke the configResolved hook to set viteConfig
      pluginArray[1].configResolved({ build: { outDir: 'dist' } })

      // Call the closeBundle hook
      await pluginArray[1].closeBundle()

      // Verify arguments were passed through
      expect(mockTauriCli.run.mock.calls.length).toBeGreaterThan(0)

      const args = mockTauriCli.run.mock.calls[0][0]
      expect(args.includes('--debug')).toBe(true)
      expect(args.includes('--target')).toBe(true)
      expect(args.includes('apple-silicon')).toBe(true)
    }
    finally {
      // Restore original argv
      process.argv = originalArgv
    }
  })
})
