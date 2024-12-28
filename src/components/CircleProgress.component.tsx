"use client"
interface CircleProgressProps {
    totalUsers: number;  // Toplam kullanıcı sayısı
    votedUsers: number;  // Oy veren kullanıcı sayısı
    percentage: number;
}

const CircleProgress = ({ totalUsers, votedUsers, percentage }: CircleProgressProps) => {

    return (
        <div className="flex justify-center items-center relative">
            {/* SVG çember */}
            <svg
                className="w-32 h-32"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Arka plan çemberi */}
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                />
                {/* İlerleyen çember */}
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    stroke={`${percentage == 100 ? "green" : "red"} `}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="100"
                    // strokeDashoffset={100 - percentage} // Burada yüzdelik oranı ayarları
                    style={
                        {
                            "--from": percentage, // Başlangıç değeri
                            "--to": 100 - percentage, // Bitiş değeri
                        } as React.CSSProperties
                    }
                    strokeLinecap="round"
                    className="animate-progress"

                />
            </svg>

            {/* Yüzdelik gösterge */}
            <div className={`absolute text-xl font-semibold ${percentage == 100 ? "text-green-700" : "text-red-600"}`}>
                {votedUsers}/{totalUsers}
            </div>
        </div>

    );
};

export default CircleProgress;
