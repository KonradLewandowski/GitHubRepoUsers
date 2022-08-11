import { GithubResponse } from "../api/GithubService";
import { Service } from "../interfaces/Service";

const fetchResponse = async (query: string, source: "users" | "repositories") => {
  try {
    const usersResponse = await fetch(
      `https://api.github.com/search/${source}?q=${query}&per_page=100`
    );
    return await usersResponse.json();
  } catch (error) {
    throw error;
  }
};

const getUsers = async (query: string) => {
  try {
    const users: GithubResponse = await fetchResponse(query, "users");

    return users.items.map((p) => ({
      id: p.id,
      name: p.login,
      url: p.html_url,
    }));
  } catch (error) {
    throw error;
  }
};

const getRepositories = async (query: string) => {
  try {
    const repositories: GithubResponse = await fetchResponse(query, "repositories");

    return repositories.items.map((p) => ({
      id: p.id,
      name: p.name,
      url: p.html_url,
    }));
  } catch (error) {
    throw error;
  }
};

export const gitHubSearchService: Service = async (query: string) => {
  try {
    const usersResponse = await getUsers(query);
    const repositoriesResponse = await getRepositories(query);

    return [...repositoriesResponse, ...usersResponse];
  } catch (error) {
    throw error;
  }
};
