console.log('utiljsx is runnint');

const a = () => {
  console.log('a');
}


const myDefault = () => {
console.log('default');
}

export { a, myDefault as default }
