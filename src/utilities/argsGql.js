export default function argsGql(args) {
   return Object.entries(args).map(entry => `${entry[0]}: ${JSON.stringify(entry[1])}`).join(', ')
}
