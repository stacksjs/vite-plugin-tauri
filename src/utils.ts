import { readFileSync } from 'node:fs'
import process from 'node:process'

export function getPackageJson(): { name: string } {
  return JSON.parse(readFileSync('package.json', 'utf8'))
}

const GREEN = '\x1B[32m'
const BOLD = '\x1B[1m'
const DIM = '\x1B[2m'
const RESET = '\x1B[0m'

export function confirm(msg: string): Promise<boolean> {
  return new Promise((resolve, _reject) => {
    const question = `${GREEN}? ${RESET}${BOLD}${msg}${RESET} ${DIM}(Y/n)${RESET}`
    process.stdout.write(question)
    process.stdin.setRawMode(true)
    process.stdin.once('data', (data) => {
      process.stdout.write(data.toString())
      process.stdout.write('\n')
      process.stdin.setRawMode(false)
      const key = data.toString()
      if (key === 'y' || key === 'Y') {
        resolve(true)
      }
      else if (key === 'n' || key === 'N') {
        resolve(false)
      }
      else {
        process.exit(1)
      }
    })
  })
}
