import { useEffect, useState } from "react";

const useViewportItems = <T extends { id: number }>(items: T[]) => {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute("data-id");
            setVisibleItems((prev) => {
              if (!prev.some((item) => item.id === Number(itemId))) {
                const newItem = items.find(
                  (item) => item.id === Number(itemId)
                );
                return newItem ? [...prev, newItem] : prev;
              }
              return prev;
            });
          }
        });
      },
      {
        root: null, // Observe relative to the viewport
        rootMargin: "0px", // No margin
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    const itemElements = document.querySelectorAll(".masonry-item");
    itemElements.forEach((item) => observer.observe(item));

    return () => {
      itemElements.forEach((item) => observer.unobserve(item));
    };
  }, [items]);

  return visibleItems;
};

export default useViewportItems;
