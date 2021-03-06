import { useEffect, useState } from "react";

function useActiveId(itemIds, rootMargin?) {
    const [activeId, setActiveId] = useState(``);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: rootMargin || `0% 0% -80% 0%` }
        );

        itemIds.forEach((id) => {
            observer.observe(document.getElementById(id));
        });

        return () => {
            itemIds.forEach((id) => {
                observer.unobserve(document.getElementById(id));
            });
        };
    }, [itemIds, rootMargin]);

    return activeId
}

export default useActiveId