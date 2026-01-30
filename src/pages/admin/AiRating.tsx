import { useEffect, useMemo, useState } from "react";
import AdminPageLayout from "../../components/layout/AdminPageLayout";
import DataTable, { type Column } from "../../components/admin/DataTable/DataTable";
import Pagination from "../../components/admin/DataTable/Pagination";
import { searchByKeys } from "../../utils/adminSearch";
import { getAiRatingsApi } from "../../api/admin.api";
import { showError } from "../../utils/toast";
import axios from "axios";
import type { UserRole } from "../../types/adminAiRating";

interface IAiRating {
  _id: string;
  name: string;
  email: string;
  role: "student" | "instructor";
  rating: number;
}

const PAGE_SIZE = 5;

const AiRating = () => {
  const [ratings, setRatings] = useState<IAiRating[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  type RoleFilter = "" | UserRole;
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await getAiRatingsApi();

        const formatted: IAiRating[] = res?.data?.data?.map((item) => ({
          _id: item.ratingId,
          name: item.user.name ?? "Unknown",
          email: item.user.email ?? "N/A",
          role: item.user.role ?? "student", // fallback for safety
          rating: item.rating,
        }));

        setRatings(formatted);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showError(err.response?.data?.message || "Failed to load AI ratings");
        } else {
          showError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const searchableKeys = useMemo<(keyof IAiRating)[]>(() => ["name", "email"], []);

  const filteredRatings = useMemo(() => {
    let result = searchByKeys(ratings, search, searchableKeys);

    if (roleFilter) {
      result = result.filter((r) => r.role === roleFilter);
    }

    return result;
  }, [ratings, search, roleFilter, searchableKeys]);

  // pagination
  const totalPages = Math.ceil(filteredRatings.length / PAGE_SIZE);
  const paginatedRatings = filteredRatings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // table column
  const columns: Column<IAiRating>[] = [
    {
      key: "name",
      header: "Name",
      render: (r) => <p className="font-medium">{r.name}</p>,
    },
    {
      key: "email",
      header: "Email",
      render: (r) => <p className="text-sm text-gray-600">{r.email}</p>,
    },
    {
      key: "role",
      header: "Role",
      render: (r) => <span className="capitalize">{r.role}</span>,
    },
    {
      key: "rating",
      header: "AI Rating",
      render: (r) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-500">({r.rating}/5)</span>
        </div>
      ),
    },
  ];

  return (
    <AdminPageLayout
      title="AI Rating & Feedback"
      search={
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded-md"
        />
      }
      filters={
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value as RoleFilter);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
      }
    >
      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading ratings...</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={paginatedRatings}
            emptyState={
              <div className="p-6 text-center text-gray-500">No ratings found</div>
            }
          />
          
          <div className="mt-20">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </AdminPageLayout>
  );
};

export default AiRating;
