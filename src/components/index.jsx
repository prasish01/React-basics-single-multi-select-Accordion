import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);
  function handleSingleSelect(currentID) {
    setSelected(currentID === selected ? null : currentID);
  }
  function handleMultipleSelection(currentID) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(currentID);
    if (findIndexOfCurrentId === -1) cpyMultiple.push(currentID);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMultiple);
    console.log(multiple);
  }

  return (
    <div className="wrapper">
      {/* Add button for enabling multi-selection */}
      <button
        onClick={() => setEnableMultiSelect(!enableMultiSelect)}
        className={`multi-select-btn ${
          enableMultiSelect ? "btn-active" : null
        }`}
      >
        {!enableMultiSelect ? "Enable" : "Disable"} multi-selection
      </button>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div className="item" key={item.id}>
                <div
                  onClick={
                    enableMultiSelect
                      ? () => handleMultipleSelection(item.id)
                      : () => handleSingleSelect(item.id)
                  }
                  className={`title ${selected === item.id ? "active" : ""}`}
                >
                  <h3>{item.question}</h3>
                  <span className={selected === item.id ? "open" : ""}>+</span>
                </div>
                {enableMultiSelect
                  ? multiple.indexOf(item.id) !== -1 && (
                      <div className="content">{item.answer}</div>
                    )
                  : selected === item.id && (
                      <div className="content">{item.answer}</div>
                    )}
              </div>
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
