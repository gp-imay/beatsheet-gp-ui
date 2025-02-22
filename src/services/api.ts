import { ApiBeat } from '../types/beat';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6ImJPb1NwQjZjMEVUNmpVMmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2hhd3Zna2lybG1kZ2JkbXV0dXFoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3MGJiZDRlMy1kNWRjLTQzMDMtYTcyYy02YjM0YjNiNGQ0MWYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMjI4MDg5LCJpYXQiOjE3NDAyMjQ0ODksImVtYWlsIjoiaW1heWF5b2dpQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJpbWF5YXlvZ2lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkltYXlhIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI3MGJiZDRlMy1kNWRjLTQzMDMtYTcyYy02YjM0YjNiNGQ0MWYifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0MDIyNDQ4OX1dLCJzZXNzaW9uX2lkIjoiMzQyYWVjYmQtOTY5ZS00NmVhLTgwMjgtOTI1MGMzMmIxNzA5IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.dmSajuU1VxXEzo8qIjO4F8OOEtVe6Hs3nU-z96IzE6Q",

export const api = {
  async getBeats(scriptId: string = '73638436-9d3d-4bc4-89ef-9d7b9e5141df'): Promise<ApiBeat[]> {
    // const token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImJPb1NwQjZjMEVUNmpVMmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2hhd3Zna2lybG1kZ2JkbXV0dXFoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3MGJiZDRlMy1kNWRjLTQzMDMtYTcyYy02YjM0YjNiNGQ0MWYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMDAzNDE4LCJpYXQiOjE3Mzk5OTk4MTgsImVtYWlsIjoiaW1heWF5b2dpQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJpbWF5YXlvZ2lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkltYXlhIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI3MGJiZDRlMy1kNWRjLTQzMDMtYTcyYy02YjM0YjNiNGQ0MWYifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTczOTk5OTgxOH1dLCJzZXNzaW9uX2lkIjoiMGNkNmM1YzgtMjQ3NS00Mjg3LWJiYTMtNDZmZDA4ZmFkZDUxIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.NywHPj2nsfNaFqtxdrMeM3_tEPvKxuAQ5SAQ9B2H0zI';
    const token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImJPb1NwQjZjMEVUNmpVMmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2hhd3Zna2lybG1kZ2JkbXV0dXFoLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI3MGJiZDRlMy1kNWRjLTQzMDMtYTcyYy02YjM0YjNiNGQ0MWYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMjI4MDg5LCJpYXQiOjE3NDAyMjQ0ODksImVtYWlsIjoiaW1heWF5b2dpQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJpbWF5YXlvZ2lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkltYXlhIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI3MGJiZDRlMy1kNWRjLTQzMDMtYTcyYy02YjM0YjNiNGQ0MWYifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0MDIyNDQ4OX1dLCJzZXNzaW9uX2lkIjoiMzQyYWVjYmQtOTY5ZS00NmVhLTgwMjgtOTI1MGMzMmIxNzA5IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.dmSajuU1VxXEzo8qIjO4F8OOEtVe6Hs3nU-z96IzE6Q';
    try {
      const response = await fetch(
        `${API_BASE_URL}/beats/${scriptId}/beatsheet`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch beats:', error);
      throw error;
    }
  }
};