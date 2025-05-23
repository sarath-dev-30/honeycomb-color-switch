
import React, { useState, useMemo } from 'react';
import './Honeycomb.css';

const Honeycomb: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());

  // Create hexagon SVG path - rotated to have corner on top
  const createHexagonPath = () => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      // Start at 30 degrees (π/6) to have a point at the top
      const angle = ((i * Math.PI) / 3) + (Math.PI / 6);
      const x = 30 + 25 * Math.cos(angle);
      const y = 26 + 25 * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  // Honeycomb layout configuration - arranging 20 hexagons in a honeycomb pattern
  const honeycombLayout = [
    [1, 2],           // Row 1: 2 hexagons
    [3, 4, 5, 6, 7],  // Row 2: 5 hexagons
    [8, 9, 10, 11, 12, 13, 14, 15], // Row 3: 8 hexagons
    [16, 17, 18, 19, 20] // Row 4: 5 hexagons
  ];

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    if (selectedValue === 0) {
      setSelectedNumbers(new Set());
      return;
    }

    const newSelected = new Set(selectedNumbers);
    if (newSelected.has(selectedValue)) {
      newSelected.delete(selectedValue);
    } else {
      newSelected.add(selectedValue);
    }
    setSelectedNumbers(newSelected);
  };

  const getCellColor = (cellNumber: number) => {
    if (!selectedNumbers.has(cellNumber)) {
      return '#4CAF50'; // Default green
    }
    return cellNumber % 2 === 0 ? '#f44336' : '#4CAF50'; // Red for even, green for odd
  };

  const counts = useMemo(() => {
    let redCount = 0;
    let greenCount = 0;

    for (let i = 1; i <= 20; i++) {
      if (selectedNumbers.has(i) && i % 2 === 0) {
        redCount++;
      } else {
        greenCount++;
      }
    }

    return { red: redCount, green: greenCount };
  }, [selectedNumbers]);

  const renderHoneycombCell = (cellNumber: number) => {
    return (
      <svg
        key={cellNumber}
        className="honeycomb-cell"
        viewBox="0 0 60 52"
        onClick={() => {
          const newSelected = new Set(selectedNumbers);
          if (newSelected.has(cellNumber)) {
            newSelected.delete(cellNumber);
          } else {
            newSelected.add(cellNumber);
          }
          setSelectedNumbers(newSelected);
        }}
      >
        <path
          d={createHexagonPath()}
          fill={getCellColor(cellNumber)}
          stroke="#333"
          strokeWidth="1"
        />
        <text
          x="30"
          y="26"
          className="honeycomb-text"
        >
          {cellNumber}
        </text>
      </svg>
    );
  };

  return (
    <div className="honeycomb-container">
      <h1 className="honeycomb-title">Hosts</h1>
      
      <div className="dropdown-container">
        <select
          className="dropdown"
          onChange={handleDropdownChange}
          value="0"
        >
          <option value="0">Select a number</option>
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="honeycomb-grid">
        {honeycombLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="honeycomb-row">
            {row.map(cellNumber => renderHoneycombCell(cellNumber))}
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="footer-row">
          <div className="count-item">
            <div className="color-indicator green-indicator"></div>
            <span>Green: {counts.green}</span>
          </div>
          <div className="count-item">
            <div className="color-indicator red-indicator"></div>
            <span>Red: {counts.red}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honeycomb;
