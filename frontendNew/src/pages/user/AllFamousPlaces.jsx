// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import famousPlacesData from "../../data/famousPlaces.json";
import FamousCard from "./FamousCard";
import { useTranslation } from "react-i18next";

const AllFamousPlaces = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const allPlaces = famousPlacesData.mandirs;
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setVisibleCount((prev) => Math.min(prev + 3, allPlaces.length));
      }
    };

    const checkInitialScroll = () => {
      if (document.body.scrollHeight <= window.innerHeight) {
        setVisibleCount((prev) => Math.min(prev + 3, allPlaces.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkInitialScroll();

    const resizeObserver = new ResizeObserver(checkInitialScroll);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [allPlaces.length]);

  return (
    <section className="py-16 px-4 bg-[#FFF8E1] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 dark:text-yellow-400 mb-12">
          {t("famous_places.heading")}
        </h1>

        <div className="space-y-10">
          {allPlaces.slice(0, visibleCount).map((place, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:scale-[1.01]"
            >
              <FamousCard place={place} />
            </div>
          ))}

          {visibleCount < allPlaces.length && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4 animate-pulse">
              {t("famous_places.scroll_to_load")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllFamousPlaces;
