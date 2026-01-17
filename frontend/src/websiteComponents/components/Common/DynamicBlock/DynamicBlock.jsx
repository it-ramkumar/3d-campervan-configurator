"use client";
import React from "react";

const DynamicBlocks = ({ blocks, setBlocks }) => {

  const addBlock = (type) => {
    const newBlock = {
      block_type: type,
      title: "",
      content: "",
      list_items: type === "list" ? [""] : [],
      table_data: type === "table" ? { headers: ["Column 1"], rows: [["Data 1"]] } : null,
      order: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index, field, value) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index] = { ...newBlocks[index], [field]: value };
      return newBlocks;
    });
  };

  // --- List Specific Functions ---
  const handleListItemChange = (blockIndex, itemIndex, value) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const newList = [...newBlocks[blockIndex].list_items];
      newList[itemIndex] = value;
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], list_items: newList };
      return newBlocks;
    });
  };

  const addListItem = (blockIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        list_items: [...newBlocks[blockIndex].list_items, ""]
      };
      return newBlocks;
    });
  };

  const removeListItem = (blockIndex, itemIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const newList = newBlocks[blockIndex].list_items.filter((_, i) => i !== itemIndex);
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], list_items: newList };
      return newBlocks;
    });
  };

  // --- Table Specific Functions ---
  const addTableColumn = (blockIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const table = { ...newBlocks[blockIndex].table_data };
      table.headers = [...table.headers, `Column ${table.headers.length + 1}`];
      table.rows = table.rows.map(row => [...row, ""]);
      newBlocks[blockIndex].table_data = table;
      return newBlocks;
    });
  };

  const addTableRow = (blockIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const table = { ...newBlocks[blockIndex].table_data };
      const newRow = new Array(table.headers.length).fill("");
      table.rows = [...table.rows, newRow];
      newBlocks[blockIndex].table_data = table;
      return newBlocks;
    });
  };

  const updateTableHeader = (blockIndex, headerIndex, value) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[blockIndex].table_data.headers[headerIndex] = value;
      return newBlocks;
    });
  };

  const updateTableCell = (blockIndex, rowIndex, cellIndex, value) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[blockIndex].table_data.rows[rowIndex][cellIndex] = value;
      return newBlocks;
    });
  };

  const removeTableRow = (blockIndex, rowIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[blockIndex].table_data.rows = newBlocks[blockIndex].table_data.rows.filter((_, i) => i !== rowIndex);
      return newBlocks;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {['heading', 'subheading', 'paragraph', 'list', 'table'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm uppercase transition-all"
          >
            + {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={index} className="relative border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <span className="text-xl">×</span>
            </button>

            <div className="mb-3">
               <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">
                 {block.block_type}
               </span>
            </div>

            {/* Title for Heading/Subheading/Table/List */}
            {(['heading', 'subheading', 'table', 'list'].includes(block.block_type)) && (
              <input
                type="text"
                placeholder={block.block_type === 'table' ? "Table Title" : block.block_type === 'list' ? "List Title" : `Enter ${block.block_type}...`}
                value={block.title || ""}
                onChange={(e) => updateBlock(index, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none mb-2"
              />
            )}

            {/* List Management */}
            {block.block_type === 'list' && block.list_items && (
              <div className="space-y-2 mt-2">
                {block.list_items.map((item, iIndex) => (
                  <div key={iIndex} className="flex gap-2 items-center">
                    <span className="text-gray-400">•</span>
                    <input
                      type="text"
                      value={item || ""}
                      onChange={(e) => handleListItemChange(index, iIndex, e.target.value)}
                      className="flex-1 p-2 border border-gray-200 rounded text-sm focus:outline-none"
                      placeholder={`Item ${iIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(index, iIndex)}
                      className="text-red-400 text-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addListItem(index)}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Add Item
                </button>
              </div>
            )}

            {/* Table Management */}
            {block.block_type === 'table' && block.table_data && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      {block.table_data.headers.map((header, hIndex) => (
                        <th key={hIndex} className="border border-gray-200 p-2 bg-gray-50">
                          <input
                            type="text"
                            value={header}
                            onChange={(e) => updateTableHeader(index, hIndex, e.target.value)}
                            className="w-full text-xs font-bold bg-transparent border-none focus:outline-none text-center"
                          />
                        </th>
                      ))}
                      <th className="border border-gray-200 p-2 bg-gray-50 w-10">
                        <button type="button" onClick={() => addTableColumn(index)} className="text-blue-600">+</button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.table_data.rows.map((row, rIndex) => (
                      <tr key={rIndex}>
                        {row.map((cell, cIndex) => (
                          <td key={cIndex} className="border border-gray-200 p-2">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => updateTableCell(index, rIndex, cIndex, e.target.value)}
                              className="w-full text-sm border-none focus:outline-none"
                            />
                          </td>
                        ))}
                        <td className="border border-gray-200 p-2 text-center">
                          <button type="button" onClick={() => removeTableRow(index, rIndex)} className="text-red-400">×</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={() => addTableRow(index)}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Add Row
                </button>
              </div>
            )}

            {/* Paragraph Block */}
            {block.block_type === 'paragraph' && (
              <textarea
                placeholder="Content..."
                value={block.content || ""}
                onChange={(e) => updateBlock(index, 'content', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded outline-none"
                rows={4}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicBlocks;