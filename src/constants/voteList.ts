import { radioBtnEnum } from "@/enums/enums";

export const voteList = [
    {
        id: radioBtnEnum.fibo,
        value: "Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)",
        list: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89"]
    },
    {
        id: radioBtnEnum.shortFibo,
        value: "Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)",
        list: ["0", "½", "1", "2", "3", "5", "8", "13", "20", "40", "100"]
    },
    {
        id: radioBtnEnum.shirt,
        value: "T-Shirt (XXS, XS, S, M, L, XL, XXL)",
        list: ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
    },
    {
        id: radioBtnEnum.shirtNumber,
        value: "T-Shirt & Numbers (S, M, L, XL, 1, 2, 3, 4, 5)",
        list: ["S", "M", "L", "XL", "1", "2", "3", "4", "5"]
    },
    {
        id: radioBtnEnum.custom,
        value: "Custom",
    },
]