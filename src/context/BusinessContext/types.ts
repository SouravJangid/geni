// eslint-disable-next-line import/named
import { EntitiesType } from '@cleartax/mint';

import { Node, GetHierarchyResponse } from 'services/ctauthz3';

export interface BusinessNode extends Node {
  organisations?: Array<BusinessNode>;
  pans?: Array<BusinessNode>;
  gstins?: Array<BusinessNode>;
  branches?: Array<BusinessNode>;
  identifier?: string;
  vendor?: boolean;
  parentId?: string;
  name?: string;
  isAccessible?: boolean;
  divisionName?: string;
  pan?: string;
  gstin?: string;
  gstinId?: string;
}

export interface Metadata {
  [k: string]: string;
  displayname: string;
}

export type BusinessWorkspaceListType = Record<string, BusinessNode>;

export type BusinessWorkspaceStateType = {
  activeBusiness: BusinessNode | null;
  activeBusinessId: string | null;
  businessList: BusinessWorkspaceListType;
  panList: BusinessWorkspaceListType;
  gstinList: BusinessWorkspaceListType;
  branchList: BusinessWorkspaceListType;
  chosenBusinessIds: string[];
  searchableBusinessList: BusinessWorkspaceListType;
  searchBusinessString: string;
  loading: boolean;
  isBusinessFetched: boolean;
  hasNoBusiness: boolean;
  workspaceImgUrl?: string;
};

interface PanNode extends Node {
  pans: Node[];
}

interface OrganisationNode extends Node {
  organisations: PanNode[];
}

export interface GetHierarchyResponseType extends GetHierarchyResponse {
  workspaceNodes?: OrganisationNode[];
}

export interface HierarchyContextProps {
  fetchHierarchyData: () => void;
  fetchingHierarchy: boolean;
  businessHierarchy: GetHierarchyResponseType;
  orgUnitId: string;
  userId: string;
  isDeductorPresent: boolean;
  businessList: BusinessWorkspaceListType;
  panList: BusinessWorkspaceListType;
  gstinList: BusinessWorkspaceListType;
  branchList: BusinessWorkspaceListType;
  searchableBusinessList: BusinessWorkspaceListType;
  setActiveBusiness: (business: BusinessNode | null) => void;
  setActiveBusinessId: (id: string) => void;
  activeBusiness: BusinessNode | null;
  activeBusinessId: string | null;
  showBusinessDrawer: boolean;
  setShowBusinessDrawer: (drawer: boolean) => void;
  isGstinDataPresent: boolean;
  setIsGstinDataPresent: (drawer: boolean) => void;
  setSearchableBusinessList: (list: BusinessWorkspaceListType) => void;
  transformedBusinessList: EntitiesType;
}

export enum BusinessWorkspaceActionsType {
  UPDATE_ACTIVE_BUSINESS = 'UPDATE_ACTIVE_BUSINESS',
  UPDATE_ACTIVE_BUSINESS_ID = 'UPDATE_ACTIVE_BUSINESS_ID',
  UPDATE_CHOOSE_BUSINESS_IDS = 'UPDATE_CHOOSE_BUSINESS_IDS',
  UPDATE_SEARCHABLE_BUSINESS_LIST = 'UPDATE_SEARCHABLE_BUSINESS_LIST',
  UPDATE_SEARCHABLE_BUSINESS_STRING = 'UPDATE_SEARCHABLE_BUSINESS_STRING',
  UPDATE_LOADING = 'UPDATE_LOADING',
  UPDATE_ALL = 'UPDATE_ALL',
}

export type BusinessHierarchyWorkspaceStateActions =
  | {
      type: BusinessWorkspaceActionsType.UPDATE_ACTIVE_BUSINESS;
      activeBusiness: BusinessNode | null;
    }
  | {
      type: BusinessWorkspaceActionsType.UPDATE_ACTIVE_BUSINESS_ID;
      activeBusinessId: string | null;
    }
  | {
      type: BusinessWorkspaceActionsType.UPDATE_CHOOSE_BUSINESS_IDS;
      chosenBusinessIds: string[];
    }
  | {
      type: BusinessWorkspaceActionsType.UPDATE_SEARCHABLE_BUSINESS_LIST;
      searchableBusinessList: BusinessWorkspaceListType;
    }
  | {
      type: BusinessWorkspaceActionsType.UPDATE_SEARCHABLE_BUSINESS_STRING;
      searchBusinessString: string;
    }
  | {
      type: BusinessWorkspaceActionsType.UPDATE_LOADING;
      loading: boolean;
    }
  | {
      type: BusinessWorkspaceActionsType.UPDATE_ALL;
      businessState: BusinessWorkspaceStateType;
    };

export type BusinessHierarchyWorkspaceActionsDispatch = (action: BusinessHierarchyWorkspaceStateActions) => void;
