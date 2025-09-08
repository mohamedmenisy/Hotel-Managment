export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IFacilitiesData {
  facilities: IFacility[];
  totalCount: number;
}

export interface IFacility {
  _id: string;
  name: string;
  createdBy: IUserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface IUserSummary {
  _id: string;
  userName: string;
}
export interface IFaciltyModal {
  name : string
}
