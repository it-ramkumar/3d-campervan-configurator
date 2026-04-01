import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ApplyForm from "../../../components/Apply/Apply";

export const metadata = {
  title: "Join the Team | Big Bear Vans",
  description: "Start your journey with Big Bear Vans. Submit your application today.",
};

export default async function ApplyPage({ params }) {
  const { id } =await params;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation */}
        <Link
          href={`/careers/${id}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Job Details
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="bg-primary p-8 text-secondary">
            <h1 className="text-3xl font-bold">Join the Team</h1>
            <p className="text-secondary/80 mt-2">
              Complete the form below to start your journey with us.
            </p>
          </div>

          {/* Form Component */}
          <ApplyForm jobId={id} />
        </div>
      </div>
    </div>
  );
}