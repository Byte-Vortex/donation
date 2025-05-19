"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/fancy/number-ticker";

const FundraisingProgress = ({ page }) => {
    console.log("page", page);
    if (!["gau-seva", "gaushala"].includes(page)) return null;
    const raisedAmount = 132234;
    const goalAmount = 9032530;
    const percentage = (raisedAmount / goalAmount) * 100;

    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const materials = [
        { name: "Medical Kit", quantity: 2971, price: "640", total: 1901440 },
        { name: "Green Fodder Bundle (100Kg)", quantity: 2971, price: "500", total: 1485500 },
        { name: "Jaggery", quantity: 1981, price: "600", total: 1188600 },
        { name: "Animal Calcium (10L)", quantity: 2476, price: "500", total: 1238000 },
        { name: "Dry Fodder Bundle (45Kg) ", quantity: 2476, price: "540", total: 1337040 },
        { name: "Daliya", quantity: 1981, price: "550", total: 1089550 },
        { name: "Sugar Cane Bundle", quantity: 1981, price: "400", total: 792400 },
    ];

    return (
        <div className="w-full flex justify-center items-center bg-gray-900">
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-white py-10 px-4 mx-auto shadow-lg">


                <div className="w-full md:w-1/3 flex flex-col items-center md:mt-10">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0,
                            type: "spring",
                            stiffness: 100,
                        }}
                        className="relative w-56 h-56"
                    >
                        <div className="relative w-full h-full rounded-full p-4 flex items-center justify-center">
                            {/* Center Text */}
                            <div className="text-center z-10">
                                <h4 className="text-xl font-bold">Amount Raised</h4>
                                <div className="text-lg mt-1 tracking-wider text-landing-tertiary">
                                    ₹&nbsp;<NumberTicker className="text-landing-tertiary" startValue={raisedAmount / 2} value={raisedAmount} />
                                </div>
                            </div>

                            {/* SVG Progress */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    className="text-landing-tertiary"
                                    strokeWidth="10"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                />
                                <motion.circle
                                    className="text-[#3f9000]"
                                    strokeWidth="9"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                    strokeDasharray={strokeDasharray}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{
                                        delay: 0,
                                        duration: 0.1,
                                        ease: "easeOut",
                                    }}
                                />
                            </svg>
                        </div>
                    </motion.div>

                    <h5 className="text-center mt-6">
                        <span className="text-landing-tertiary">₹ {raisedAmount.toLocaleString()}</span> Amount raised out of <br />
                        a goal of <strong className="text-landing-tertiary">₹ 90,32,530</strong>
                    </h5>
                </div>

                {/* Right: Table */}
                <div className="w-full md:w-2/3">
                    <h4 className="font-bold mb-6 text-gray-200 md:text-left text-center">
                        Where your money will be spent?
                    </h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b border-gray-600">
                                <tr>
                                    <th className="py-2">Material</th>
                                    <th className="py-2">Quantity</th>
                                    <th className="py-2 hidden md:block">Price/Unit</th>
                                    <th className="py-2 md:text-left text-right">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materials.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800">
                                        <td className="flex items-center gap-2 py-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            {item.name}
                                        </td>
                                        <td className="py-2 pl-4">{item.quantity.toLocaleString()}</td>
                                        <td className="py-2 pl-4 hidden md:block">{item.price.toLocaleString()}</td>
                                        <td className="py-2 md:text-left text-right">₹ {item.total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default FundraisingProgress;
