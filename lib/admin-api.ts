// Mock API functions for admin dashboard
// These will be replaced with actual API calls later

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export type OrderStatus = "Received" | "Preparing" | "Ready" | "Completed";

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  displayName: string;
  tableNumber: string;
  items: Array<{
     itemId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  nameEn: string;
  nameJp: string;
  price: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "customer" | "staff" | "admin" | "manager";

export interface User {
  _id: string;
  userId: string;
  displayName: string;
  email?: string;
  phone?: string;
  role: UserRole;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// Order API functions - Fetch from MongoDb
export async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch orders';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch orders');
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to update order status';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update order status');
  }
}

// Menu API functions - Fetch from MongoDB via backend only
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to fetch menu items';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch menu items');
  }
}

export async function createMenuItem(item: Omit<MenuItem, "_id" | "createdAt" | "updatedAt">): Promise<MenuItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to create menu item';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create menu item');
  }
}

export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to update menu item';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        errorMessage = `${errorMessage} (Status: ${response.status})`;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update menu item');
  }
}

export async function deleteMenuItem(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to delete menu item';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        errorMessage = `${errorMessage} (Status: ${response.status})`;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to delete menu item');
  }
}

// User Management API Functions
export async function getUsers(): Promise<User[]> {
  try {
    // Try to fetch from backend API first
    const response = await fetch(`${API_BASE_URL}/users`);
    if (response.ok) {
      return response.json();
    }
    // If backend API doesn't exist, extract users from orders
    const orders = await getOrders();
    const userMap = new Map<string, {
      userId: string;
      displayName: string;
      totalOrders: number;
      totalSpent: number;
      lastOrderDate?: string;
      orders: Order[];
    }>();

    orders.forEach((order) => {
      const existing = userMap.get(order.userId);
      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent += order.total;
        if (!existing.lastOrderDate || new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = order.createdAt;
        }
        existing.orders.push(order);
      } else {
        userMap.set(order.userId, {
          userId: order.userId,
          displayName: order.displayName,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.createdAt,
          orders: [order],
        });
      }
    });

    const users: User[] = Array.from(userMap.values()).map((userData, index) => ({
      _id: `user_${index + 1}`,
      userId: userData.userId,
      displayName: userData.displayName,
      role: "customer" as UserRole,
      totalOrders: userData.totalOrders,
      totalSpent: userData.totalSpent,
      lastOrderDate: userData.lastOrderDate,
      createdAt: userData.orders[0]?.createdAt || new Date().toISOString(),
      updatedAt: userData.lastOrderDate || new Date().toISOString(),
      isActive: true,
    }));

    return users;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      // If backend is not available, try to get from orders
      try {
        const orders = await getOrders();
        const userMap = new Map<string, {
          userId: string;
          displayName: string;
          totalOrders: number;
          totalSpent: number;
          lastOrderDate?: string;
          orders: Order[];
        }>();

        orders.forEach((order) => {
          const existing = userMap.get(order.userId);
          if (existing) {
            existing.totalOrders += 1;
            existing.totalSpent += order.total;
            if (!existing.lastOrderDate || new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
              existing.lastOrderDate = order.createdAt;
            }
            existing.orders.push(order);
          } else {
            userMap.set(order.userId, {
              userId: order.userId,
              displayName: order.displayName,
              totalOrders: 1,
              totalSpent: order.total,
              lastOrderDate: order.createdAt,
              orders: [order],
            });
          }
        });

        const users: User[] = Array.from(userMap.values()).map((userData, index) => ({
          _id: `user_${index + 1}`,
          userId: userData.userId,
          displayName: userData.displayName,
          role: "customer" as UserRole,
          totalOrders: userData.totalOrders,
          totalSpent: userData.totalSpent,
          lastOrderDate: userData.lastOrderDate,
          createdAt: userData.orders[0]?.createdAt || new Date().toISOString(),
          updatedAt: userData.lastOrderDate || new Date().toISOString(),
          isActive: true,
        }));

        return users;
      } catch (innerError) {
        throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running.`);
      }
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch users');
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to update user';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        errorMessage = `${errorMessage} (Status: ${response.status})`;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to delete user';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        errorMessage = `${errorMessage} (Status: ${response.status})`;
      } catch {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running on port 5001.`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to delete user');
  }
}

