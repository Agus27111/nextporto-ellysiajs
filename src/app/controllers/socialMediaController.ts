import prisma from "../../../prisma/client";

// Mendapatkan semua media sosial
export const getAllSocialMedia = async () => {
  try {
    const socialMediaData = await prisma.socialMedia.findMany();

    return {
      success: true,
      message: "Social media data fetched successfully",
      data: socialMediaData,
    };
  } catch (error) {
    console.error("Error fetching social media data:", error);
    throw new Error("Error fetching social media data");
  }
};

export const createSocialMedia = async (data: {
  platform: string;
  icon: string;
  url: string;
}) => {
  try {
    const { platform, icon, url } = data;

    // Validasi input
    if (!platform || !icon || !url) {
      throw new Error("Missing required fields");
    }

    const socialMediaData = await prisma.socialMedia.create({
      data: { platform, icon, url },
    });

    return {
      message: "Social media created successfully",
      data: socialMediaData,
    };
  } catch (error) {
    console.error("Error creating social media:", error);
    throw new Error("Error creating social media");
  }
};
