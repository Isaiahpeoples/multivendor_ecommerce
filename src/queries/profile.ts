"use server";

import { db } from "@/lib/db";
import {
  OrderStatus,
  OrderTableDateFilter,
  OrderTableFilter,
  PaymentStatus,
  PaymentTableDateFilter,
  PaymentTableFilter,
  ReviewDateFilter,
  ReviewFilter,
} from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { PaymentMethod } from "@prisma/client";
import { subMonths, subYears } from "date-fns";

// Function: getUserOrders
// Description: Retrieves user orders, with populated groups and items,
//              item count, and shipping address.
// Parameters:
//   - filter: String to filter orders by.
//   - page: The current page number for pagination (default = 1).
//   - pageSize: The number of products per page (default = 10).
//   - search: the string to search by.
//   - period: The period of orders u wanna get.
// Returns: Array containing user orders with groups sorted by totalPrice in descending order.
export const getUserOrders = async (
  filter: OrderTableFilter = "",
  period: OrderTableDateFilter = "",
  search = "" /* Search by Order id, store name, products name */,
  page: number = 1,
  pageSize: number = 10
) => {
  // Retrieve current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Calculate pagination values
  const skip = (page - 1) * pageSize;

  // Construct the base query
  const whereClause: any = {
    AND: [
      {
        userId: user.id,
      },
    ],
  };

  // Apply filters
  if (filter === "unpaid")
    whereClause.AND.push({ paymentStatus: PaymentStatus.Pending });
  if (filter === "toShip")
    whereClause.AND.push({ orderStatus: OrderStatus.Processing });
  if (filter === "shipped")
    whereClause.AND.push({ orderStatus: OrderStatus.Shipped });
  if (filter === "delivered")
    whereClause.AND.push({ orderStatus: OrderStatus.Delivered });

  // Apply period filter
  const now = new Date();
  if (period === "last-6-months") {
    whereClause.AND.push({
      createdAt: { gte: subMonths(now, 6) },
    });
  }
  if (period === "last-1-year")
    whereClause.AND.push({ createdAt: { gte: subYears(now, 1) } });
  if (period === "last-2-years")
    whereClause.AND.push({ createdAt: { gte: subYears(now, 2) } });

  // Apply search filter
  if (search.trim()) {
    whereClause.AND.push({
      OR: [
        {
          id: { contains: search }, // Search by order ID
        },
        {
          groups: {
            some: {
              store: {
                name: { contains: search }, // Search by store name (no mode here)
              },
            },
          },
        },
        {
          groups: {
            some: {
              items: {
                some: {
                  name: { contains: search }, // Search by product name (no mode here)
                },
              },
            },
          },
        },
      ],
    });
  }

  // Fetch orders for the current page
  const orders = await db.order.findMany({
    where: whereClause,
    include: {
      groups: {
        include: {
          items: true,
          _count: {
            select: {
              items: true,
            },
          },
        },
      },
      shippingAddress: {
        include: {
          country: true,
        },
      },
    },
    take: pageSize, // Limit to page size
    skip, // Skip the orders of previous pages
    orderBy: {
      updatedAt: "desc", // Sort by most updated recently
    },
  });

  // Fetch total count of orders for the query
  const totalCount = await db.order.count({ where: whereClause });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Return paginated data with metadata
  return {
    orders,
    totalPages,
    currentPage: page,
    pageSize,
    totalCount,
  };
};

/**
 * @name getUserPayments
 * @description - Retrieves paginated payment details for the authenticated user, with optional filters and search functionality.
 * @access User
 * @param filter - A string to filter payments by method (e.g., "paypal", "credit-card").
 * @param period - A string representing the time range for payments (e.g., "last-6-months").
 * @param search - A string to search within payment details (e.g., paymentMethod or currency).
 * @param page - The page number for pagination (default: 1).
 * @param pageSize - The number of records to return per page (default: 10).
 * @returns A Promise resolving to an object containing:
 *   - `payments`: An array of payment details.
 *   - `totalPages`: The total number of pages available.
 *   - `currentPage`: The current page number.
 *   - `pageSize`: The number of records per page.
 *   - `totalCount`: The total number of payment records matching the query.
 */
export const getUserPayments = async (
  filter: PaymentTableFilter = "",
  period: PaymentTableDateFilter = "",
  search = "" /* Search by Payment intent id */,
  page: number = 1,
  pageSize: number = 10
) => {
  // Retrieve current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Calculate pagination values
  const skip = (page - 1) * pageSize;

  // Construct the base query
  const whereClause: any = {
    AND: [
      {
        userId: user.id,
      },
    ],
  };

  // Apply filters
  if (filter === "paypal") whereClause.AND.push({ paymentMethod: "Paypal" });
  if (filter === "credit-card")
    whereClause.AND.push({ paymentMethod: "Stripe" });

  // Apply period filter
  const now = new Date();
  if (period === "last-6-months") {
    whereClause.AND.push({
      createdAt: { gte: subMonths(now, 6) },
    });
  }
  if (period === "last-1-year")
    whereClause.AND.push({ createdAt: { gte: subYears(now, 1) } });
  if (period === "last-2-years")
    whereClause.AND.push({ createdAt: { gte: subYears(now, 2) } });

  // Apply search filter
  if (search.trim()) {
    whereClause.AND.push({
      OR: [
        {
          id: { contains: search }, // Search by ID
        },
        {
          paymentInetntId: { contains: search }, // Search by Payment intent ID
        },
      ],
    });
  }

  // Fetch payments for the current page
  const payments = await db.paymentDetails.findMany({
    where: whereClause,
    include: {
      order: true,
    },
    take: pageSize, // Limit to page size
    skip, // Skip the orders of previous pages
    orderBy: {
      updatedAt: "desc", // Sort by most updated recently
    },
  });

  // Fetch total count of orders for the query
  const totalCount = await db.paymentDetails.count({ where: whereClause });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Return paginated data with metadata
  return {
    payments,
    totalPages,
    currentPage: page,
    pageSize,
    totalCount,
  };
};

/**
 * @name getUserReviews
 * @description - Retrieves paginated reviews for the authenticated user, with optional filters for rating and search functionality.
 * @access User
 * @param filter - A string to filter reviews by rating (e.g., "5", "4", "3", "2", "1").
 * * @param period - A string to filter reviews by creation date:
 *   - "" (no filter)
 *   - "last-6-months"
 *   - "last-1-year"
 *   - "last-2-years".
 * @param search - A string to search within the review text.
 * @param page - The page number for pagination (default: 1).
 * @param pageSize - The number of records to return per page (default: 10).
 * @returns A Promise resolving to an object containing:
 *   - `reviews`: An array of review details.
 *   - `totalPages`: The total number of pages available.
 *   - `currentPage`: The current page number.
 *   - `pageSize`: The number of records per page.
 *   - `totalCount`: The total number of review records matching the query.
 */
export const getUserReviews = async (
  filter: ReviewFilter = "",
  period: ReviewDateFilter = "",
  search = "" /* Search by Payment intent id */,
  page: number = 1,
  pageSize: number = 10
) => {
  // Retrieve current user
  const user = await currentUser();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Calculate pagination values
  const skip = (page - 1) * pageSize;

  // Construct the base query
  const whereClause: any = {
    AND: [
      {
        userId: user.id,
      },
    ],
  };

  // Apply filters
  if (filter) whereClause.AND.push({ rating: parseFloat(filter) });

  // Apply period filter
  const now = new Date();
  if (period === "last-6-months") {
    whereClause.AND.push({
      createdAt: { gte: subMonths(now, 6) },
    });
  }
  if (period === "last-1-year")
    whereClause.AND.push({ createdAt: { gte: subYears(now, 1) } });
  if (period === "last-2-years")
    whereClause.AND.push({ createdAt: { gte: subYears(now, 2) } });

  // Apply search filter
  if (search.trim()) {
    whereClause.AND.push({
      review: { contains: search }, // Search by review text
    });
  }

  // Fetch reviews for the current page
  const reviews = await db.review.findMany({
    where: whereClause,
    include: {
      images: true,
      user: true,
    },
    take: pageSize, // Limit to page size
    skip, // Skip the orders of previous pages
    orderBy: {
      updatedAt: "desc", // Sort by most updated recently
    },
  });

  // Fetch total count of orders for the query
  const totalCount = await db.review.count({ where: whereClause });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Return paginated data with metadata
  return {
    reviews,
    totalPages,
    currentPage: page,
    pageSize,
    totalCount,
  };
};

/**
 * @name getUserWishlist
 * @description - Retrieves paginated wishlist items for the authenticated user.
 * @access User
 * @param page - The page number for pagination (default: 1).
 * @param pageSize - The number of records to return per page (default: 10).
 * @returns A Promise resolving to an object containing:
 *   - `wishlist`: An array of wishlist items formatted with product details.
 *   - `totalPages`: The total number of pages available.
 */
export const getUserWishlist = async (
  page: number = 1,
  pageSize: number = 10
) => {
  // Retrieve the current user
  const user = await currentUser();

  // Check if the user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Calculate pagination values
  const skip = (page - 1) * pageSize;

  // Fetch wishlist items for the current page
  const wishlist = await db.wishlist.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: {
        select: {
          id: true,
          slug: true,
          name: true,
          rating: true,
          sales: true,
          variants: {
            select: {
              id: true,
              variantName: true,
              slug: true,
              images: true,
              sizes: true,
            },
          },
        },
      },
    },
    take: pageSize,
    skip,
  });

  // Transform wishlist items into the desired structure

  const formattedWishlist = wishlist.map((item) => ({
    id: item.product.id,
    slug: item.product.slug,
    name: item.product.name,
    rating: item.product.rating,
    sales: item.product.sales,
    variants: [
      {
        variantId: item.product.variants[0].id,
        variantSlug: item.product.variants[0].slug,
        variantName: item.product.variants[0].variantName,
        images: item.product.variants[0].images,
        sizes: item.product.variants[0].sizes,
      },
    ],
    variantImages: [],
  }));

  // Fetch the total count of wishlist items for the query
  const totalCount = await db.wishlist.count({
    where: {
      userId: user.id,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    wishlist: formattedWishlist,
    totalPages,
  };
};

/**
 * @name getUserFollowedStores
 * @description - Retrieves all stores that the authenticated user follows, with pagination.
 * @access User
 * @param page - The page number for pagination (default is 1).
 * @param pageSize - The number of stores per page (default is 10).
 * @returns A Promise resolving to an object containing:
 *   - `stores`: An array of stores in the required format.
 *   - `totalPages`: The total number of pages.
 */
export const getUserFollowedStores = async (
  page: number = 1,
  pageSize: number = 10
) => {
  // Retrieve the current user
  const user = await currentUser();

  // Check if the user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Calculate the skip value for pagination
  const skip = (page - 1) * pageSize;

  // Fetch the stores the user follows with pagination
  const followedStores = await db.store.findMany({
    where: {
      followers: {
        some: {
          id: user.id,
        },
      },
    },
    select: {
      id: true,
      url: true,
      name: true,
      logo: true,
      followers: {
        select: {
          id: true,
        },
      },
    },
    take: pageSize,
    skip,
  });

  // Fetch the total number of followed stores (without pagination)
  const totalCount = await db.store.count({
    where: {
      followers: {
        some: {
          id: user.id,
        },
      },
    },
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Transform the stores into the required format
  const stores = followedStores.map((store) => ({
    id: store.id,
    url: store.url,
    name: store.name,
    logo: store.logo,
    followersCount: store.followers.length,
    isUserFollowingStore: true, // Always true since these are followed stores
  }));
  return {
    stores,
    totalPages,
  };
};
