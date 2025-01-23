import { Request, Response } from "express";
import Review from "../models/review.model";

export const getPaginatedReviews = async (
    product_id: string,
    page: number = 1,
    pageSize: number = 3
  ) => {
    try {
      const skip = (page - 1) * pageSize;
  
      const totalReviews = await Review.countDocuments({ product: product_id });
  
      const reviews = await Review.find({ product: product_id })
        .skip(skip)
        .limit(pageSize);
  
      return {
        reviews,
        totalReviews,
        totalPages: Math.ceil(totalReviews / pageSize),
        currentPage: page,
        hasNextPage: page * pageSize < totalReviews,
        hasPreviousPage: page > 1,
      };
    } catch (error) {
      console.error("Error fetching paginated reviews:", error);
      throw new Error("Failed to fetch paginated reviews");
    }
  };
  
