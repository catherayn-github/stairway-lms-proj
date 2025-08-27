/* PLUGINS */
import ReactSkeleton, { SkeletonProps } from "react-loading-skeleton";
/* STYLES */
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = ({ ...props }: SkeletonProps) => {
	return (
		<ReactSkeleton baseColor="#f0f3f7" highlightColor="#E4E7EB" {...props} borderRadius={8} />
	);
};

export default Skeleton;
