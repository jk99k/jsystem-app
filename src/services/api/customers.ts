const API_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://jishikawasys.com/api"
    : "http://localhost:8001";

export type CustomerDisplay = {
  id: number;
  store_id: number;
  token?: string | null;
  token_issued_at?: string | null; // datetimeはISO文字列で受け取る
};

export type CustomerDetail = {
  id: number;
  store_id: number;
  name: string;
  furigana: string;
  nickname: string;
  mail_address: string;
  gender: string;
  home_town: string;
  post_code?: string;
  address: string;
  birth_date: string;
  question_answers?: string;
};

export type CustomerDisplayForAttendance = {
  id: number;
  store_id: number;
  nickname: string;
  gender: string;
  home_town: string;
  birth_date: string;
  queston_answers?: string;
  comment?: string;
  token?: string;
  token_issued_at?: string;
  visit_count: number;
};

export type CustomerAttendance = {
  id: number;
  customer_id: number;
  store_id: number;
  start_time: string;
  end_time: string | null;
  customer: CustomerDisplayForAttendance;
  is_active: boolean;
};

export async function loginByToken(
  storeId: string,
  token: string
): Promise<CustomerDisplay | null> {
  const res = await fetch(
    `${API_ORIGIN}/v1/customers/${storeId}/login_by_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }
  );
  const data = await res.json();
  return data ?? null;
}

export type CustomerBase = {
  name: string;
  furigana: string;
  nickname: string;
  mail_address: string;
  gender: string;
  home_town: string;
  post_code?: string;
  address: string;
  birth_date: string; // YYYY-MM-DD形式
  question_answers?: string;
};

export async function registerCustomer(
  storeId: string,
  data: Omit<CustomerBase, "question_answers"> & { question_answers?: string[] }
): Promise<Record<string, unknown>> {
  // question_answersが配列ならコンマ区切りに変換
  const payload: CustomerBase = {
    ...data,
    question_answers: data.question_answers
      ? data.question_answers.join(",")
      : undefined,
  };
  const res = await fetch(`${API_ORIGIN}/v1/customers/${storeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("登録に失敗しました");
  return await res.json();
}

// 顧客詳細情報を取得
export async function getCustomerDetail(
  storeId: string,
  customerId: number
): Promise<CustomerDetail> {
  const res = await fetch(
    `${API_ORIGIN}/v1/customers/${storeId}/${customerId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "顧客情報の取得に失敗しました");
  }

  return await res.json();
}

// 顧客出席関連のAPI
export async function getActiveCustomers(
  storeId: string
): Promise<CustomerAttendance[]> {
  const res = await fetch(
    `${API_ORIGIN}/v1/customer-attendances/stores/${storeId}/active`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "出席中顧客の取得に失敗しました");
  }

  return await res.json();
}

export async function checkInCustomer(
  storeId: string,
  customerId: number
): Promise<Record<string, unknown>> {
  const res = await fetch(
    `${API_ORIGIN}/v1/customer-attendances/stores/${storeId}/customers/${customerId}/check-in`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "入店処理に失敗しました");
  }

  return await res.json();
}

export async function checkOutCustomer(
  storeId: string,
  customerId: number
): Promise<Record<string, unknown>> {
  const res = await fetch(
    `${API_ORIGIN}/v1/customer-attendances/stores/${storeId}/customers/${customerId}/check-out`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "退店処理に失敗しました");
  }

  return await res.json();
}

export async function updateCustomerComment(
  customerId: number,
  comment: string
): Promise<void> {
  const res = await fetch(`${API_ORIGIN}/v1/customers/${customerId}/comment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "コメントの更新に失敗しました");
  }
}
