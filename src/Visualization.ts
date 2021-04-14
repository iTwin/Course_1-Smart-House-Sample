import { IModelConnection, ScreenViewport } from "@bentley/imodeljs-frontend";

export class Visualization {

  public static hideHouseExterior = async (vp: ScreenViewport) => {

    const categoryIds = await Visualization.getCategoryIds(vp.iModel);
    vp.changeCategoryDisplay(categoryIds, false);
  }

  private static getCategoryIds = async (iModel: IModelConnection) => {

    const categoriesToHide = [
      "'Wall 2nd'",
      "'Wall 1st'",
      "'Dry Wall 2nd'",
      "'Dry Wall 1st'",
      "'Brick Exterior'",
      "'WINDOWS 1ST'",
      "'WINDOWS 2ND'",
      "'Ceiling 1st'",
      "'Ceiling 2nd'",
      "'Callouts'",
      "'light fixture'",
      "'Roof'",
    ]

    const query = `SELECT ECInstanceId FROM Bis.Category 
        WHERE CodeValue IN (${categoriesToHide.toString()})`;
    
    const result = iModel.query(query);
    const categoryIds = [];

    for await (const row of result)
        categoryIds.push(row.id);

    return categoryIds;
  }
}