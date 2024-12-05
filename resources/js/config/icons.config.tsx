import Java from "@/lib/icon/Java";
import PHP from "@/lib/icon/PHP";
import Python from "@/lib/icon/Python";
import Javascript from "@/lib/icon/Javascript";
import Qa from "@/lib/icon/Qa";
import Kubernetes from "@/lib/icon/Kubernetes";

const iconComponents: Record<
    string,
    (color: string, size?: number) => JSX.Element
> = {
    Php: (color: string, size: number = 65) => (
        <PHP size={size} className={color} />
    ),
    Java: (color: string, size: number = 65) => (
        <Java size={size} className={color} />
    ),
    Python: (color: string, size: number = 65) => (
        <Python size={size} className={color} />
    ),
    Javascript: (color: string, size: number = 65) => (
        <Javascript size={size} className={color} />
    ),
    Qa: (color: string, size: number = 65) => (
        <Qa size={size} className={color} />
    ),
    Kubernetes: (color: string, size: number = 65) => (
        <Kubernetes size={size} className={color} />
    ),
};

export default iconComponents;
