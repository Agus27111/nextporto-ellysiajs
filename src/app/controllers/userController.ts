import prisma from "../../../prisma/client";

// Mendapatkan semua pengguna
export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
};

export const findUserById = async (id: string) => {
  const userId = parseInt(id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Error fetching user by ID");
  }
};

// Membuat pengguna baru
export const createUser = async (data: {
  name: string;
  location: string;
  email: string;
}) => {
  try {
    const { name, location, email } = data;

    if (!name || !location || !email) {
      throw new Error("Missing required fields");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = await prisma.user.create({
      data: { name, location, email },
    });

    return {
      message: "User created successfully",
      data: newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

export const updateUserById = async (
  id: string,
  options: {
    name?: string;
    location?: string;
    email?: string;
  }
) => {
  try {
    const userId = parseInt(id);
    const { name, location, email } = options;

    const findUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name ? { name } : {}),
        ...(location ? { location } : {}),
        ...(email ? { email } : {}),
      },
    });

    return {
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const userId = parseInt(id);
    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    return {
      message: "User deleted successfully",
      data: deletedUser,
    };
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
};
