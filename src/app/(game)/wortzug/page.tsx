import type { Metadata } from "next";
import WortzugClient from "../../../components/wortzug/WortzugClient";

export const metadata: Metadata = {
  title: "Wortzug - Fun Typing Game",
  description: "Type to build words using a robotic arm to load up cargo trains.",
};

export default function Page() {
  return <WortzugClient />;
}
