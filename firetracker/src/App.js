

// import React from 'react';
// import Portfolio from './Portfolio';
// import Investments from './Investments';

// function App() {
//   return (
//     <div class>
//       <Portfolio />
//       <Investments />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import Portfolio from './Portfolio';
import Investments from './Investments';
import Expenses from './Expenses';  // Import the Expenses component

function App() {
  return (
    <div>
      <Portfolio />
      <Investments />
      <Expenses />
    </div>
  );
}

export default App;
