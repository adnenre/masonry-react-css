import React, { useRef } from "react";
import useViewportItems from "../hooks/useViewportItems";
import "./Masonry.css";

interface Item {
  id: number;
  image: string;
  alt: string;
  caption: string;
}

interface MasonryProps {
  items: Item[];
}

const Masonry: React.FC<MasonryProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleItems = useViewportItems(items);
  return (
    <div className="masonry-columns" ref={containerRef}>
      {items.map((item) => (
        <div key={item.id} className="masonry-item" data-id={item.id}>
          {visibleItems.some((visibleItem) => visibleItem.id === item.id) ? (
            <img src={item.image} alt={item.alt} />
          ) : (
            <div style={{ height: "200px", background: "#f0f0f0" }} /> // Placeholder
          )}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
