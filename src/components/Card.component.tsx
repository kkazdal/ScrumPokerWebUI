"use client"
import { colors } from "@/constants/cardColorList";
import { JSX } from "react";

interface IPROPS {
    card: any,
    index: any,
    selectedCard: any,
    _onclickCardSelect: (card: any) => void,
}

export const CardComponent = ({ card, index, selectedCard, _onclickCardSelect }: IPROPS): JSX.Element => {

    return (
        <div
            onClick={() => _onclickCardSelect(card)}
            key={card}
            className={`absolute 
          xl:w-[5rem] xl:h-[8rem]  // Extra large ekranlar için boyut
          lg:w-[4rem] lg:h-[7rem] // Large ekranlar için boyut
          md:w-[4rem] md:h-[6rem] // Medium ekranlar için boyut
          sm:w-[2.5rem] sm:h-[5rem]  // Small ekranlar için boyut
          rounded-md shadow-lg transform transition-all duration-200 hover:scale-105 
          flex items-center justify-center text-white font-bold cursor-pointer
          ${card == selectedCard && "translate-y-[-20px]"}
          `}
            style={{
                left: `${index * 8}%`, // Daha yakın konumlandırma
                zIndex: index, // Kartların sırayla üst üste binmesi için z-index
                backgroundColor: colors[index],
            }}
        >
            <span
                className="absolute top-2 left-2 
            xl:text-lg lg:text-md md:text-sm sm:text-xs text-[10px]" // Responsive metin boyutları
            >
                {card}
            </span>
            <p className="xl:text-xl lg:text-lg md:text-md sm:text-sm text-[12px]">{card}</p> {/* Merkezdeki metin */}
        </div>
    );
}