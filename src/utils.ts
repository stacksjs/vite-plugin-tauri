import { Buffer } from 'node:buffer'
import { readFileSync } from 'node:fs'
import process from 'node:process'

/**
 * Interface representing the minimal structure of a package.json file
 */
export interface PackageJson {
  name: string
  [key: string]: unknown
}

/**
 * Retrieves the package.json content from the current working directory
 *
 * @returns {PackageJson} The parsed package.json content
 * @throws {Error} If the package.json file cannot be read or parsed
 */
export function getPackageJson(): PackageJson {
  try {
    return JSON.parse(readFileSync('package.json', 'utf8'))
  }
  catch (error) {
    console.error('Failed to read or parse package.json:', error)
    return { name: 'tauri-app' }
  }
}

const GREEN = '\x1B[32m'
const BOLD = '\x1B[1m'
const DIM = '\x1B[2m'
const RESET = '\x1B[0m'

/**
 * Prompts the user for a yes/no confirmation
 *
 * @param {string} msg - The message to display to the user
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms, false otherwise
 */
export function confirm(msg: string): Promise<boolean> {
  return new Promise((resolve) => {
    const question = `${GREEN}? ${RESET}${BOLD}${msg}${RESET} ${DIM}(Y/n)${RESET}`
    process.stdout.write(question)

    process.stdin.setRawMode(true)
    process.stdin.resume()

    const onData = (data: Uint8Array): void => {
      const input = Buffer.from(data).toString()
      process.stdout.write(input)
      process.stdout.write('\n')
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdin.removeListener('data', onData)

      const key = input.toLowerCase()
      if (key === '\n' || key === 'y' || key === '\r') {
        resolve(true)
      }
      else if (key === 'n') {
        resolve(false)
      }
      else {
        // eslint-disable-next-line no-console
        console.log('Invalid input. Please try again.')
        process.stdout.write(question)
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.once('data', (newData) => {
          onData(newData)
        })
      }
    }

    process.stdin.once('data', onData)
  })
}
