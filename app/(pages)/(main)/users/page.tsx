/* COMPONENTS */
import UserHeader from "./_components/UserHeader";
import UserTable from "./_components/UserTable";

/* PLUGINS */
import { Hydrate } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

/* UTILITIES */
import { UserSearchParamsCache } from "@app/_utils/filters/user_filters";
/* SERVICES */
import { prefetchGetUsers } from "@app/_prefetch/user.prefetch";

interface Props {
    searchParams: Promise<SearchParams>;
}

const UserPage = async ({ searchParams }: Props) => {
    const filters = await UserSearchParamsCache.parse(searchParams);
    const response = await prefetchGetUsers(filters);
    return (
        <div className="flex flex-col gap-[2.4rem]">
            <UserHeader />
            <Hydrate state={response?.dehydrated_state}>
                <UserTable />
            </Hydrate>
        </div>
    );
};

export default UserPage;
