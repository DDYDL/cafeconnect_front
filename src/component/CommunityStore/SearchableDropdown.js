// import { useEffect, useRef, useState } from "react";

// const SearchableDropdown = ({ options, label, handleChange }) => {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     document.addEventListener("click", toggle);
//     return () => document.removeEventListener("click", toggle);
//   }, []);

//   const selectOption = option => {
//     setQuery(() => "");
//     handleChange(option[label]);
//     setIsOpen(isOpen => !isOpen);
//   };

//   function toggle(e) {
//     setIsOpen(e && e.target === inputRef.current);
//   }

//   const filter = options => {
//     return options.filter(option => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1);
//   };

//   return (
//     <div className="dropdown">
//       <div className="control">
//         <div className="selected-value">
//           <input
//             ref={inputRef}
//             type="text"
//             name="searchTerm"
//             onChange={e => {
//               setQuery(e.target.value);
//             }}
//             onClick={toggle}
//           />
//         </div>
//         <div className={`arrow ${isOpen ? "open" : ""}`}></div>
//       </div>

//       <div className={`options ${isOpen ? "open" : ""}`}>
//         {filter(options).map((option, index) => {
//           return (
//             <div
//               onClick={() => selectOption(option)}
//               className="option"
//               //   className={`option ${
//               //     option[label] === selectedVal ? "selected" : ""
//               //   }`}
//               key={`${option.menuCode}`}
//             >
//               {option[label]}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SearchableDropdown;
