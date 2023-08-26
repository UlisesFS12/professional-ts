import type { ITeam } from '../types';
import { apiCall } from '../utils/networking';

function isITeam(arg: any): arg is ITeam[] {
  return (
    typeof arg.iconUrl === 'string' &&
    typeof arg.name === 'string' &&
    typeof arg.id === 'string' &&
    Array.isArray(arg.channels)
  );
}

function assertIsTypedArray<T>(
  arg: any,
  check: (val: any) => val is T,
): asserts arg is T {
  if (!Array.isArray(arg))
    throw new Error(`Not an Array: ${JSON.stringify(arg)}`);
  if (arg.some((items) => !check(items)))
    throw new Error(`Violators fond: ${JSON.stringify(arg)}`);
}

let cachedAllTeamsList: Promise<ITeam[]>;
export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === 'undefined')
    cachedAllTeamsList = apiCall('teams').then((rawData) => {
      assertIsTypedArray(rawData, isITeam);
      return rawData;
    });
  return await cachedAllTeamsList;
}

const cachedTeamRecords: Record<string, Promise<ITeam>> = {};

export async function getTeamById(id: string): Promise<ITeam> {
  let cached = cachedTeamRecords[id];
  if (typeof cached === 'undefined')
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`);
  return await cached;
}
