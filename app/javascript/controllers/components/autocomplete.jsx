import React from "react";
import { createRoot } from "react-dom/client";
import { AutoComplete as AntdAutoComplete } from "antd";

const products = [
  { value: "Nike Shoes" },
  { value: "Adidas Shoes" },
  { value: "Apple Watch" },
];

const Autocomplete = ({ value: valueProp, onSelected }) => {
  const [value, setValue] = React.useState(valueProp);

  const [options, setOptions] = React.useState(products);

  const onSelect = (data) => {
    onSelected(data);
  };
  const onChange = (data) => {
    setValue(data);
  };

  const getPanelValue = (searchText) => {
    return options
      .filter((option) =>
        option.value.toLowerCase().includes(searchText?.toLowerCase())
      )
      .map((option) => ({ value: option.value }));
  };

  return (
    <AntdAutoComplete
      value={value}
      options={options}
      style={{
        width: 200,
      }}
      onSelect={onSelect}
      onSearch={(text) => setOptions(getPanelValue(text))}
      onChange={onChange}
      placeholder="control mode"
    />
  );
};

let root = null;

function render(node, props) {
  root = createRoot(node);
  root.render(<Autocomplete {...props} />);
}

function destroy() {
  root.unmount();
}

export { destroy, render };
