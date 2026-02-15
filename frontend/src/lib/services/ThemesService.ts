import type { Theme } from "$lib/types/Theme";

export class ThemesService {
  static async getAll(): Promise<Theme[]> {
    return [
      {
        "id": "barber",
        "label": "Barbería"
      },
      {
        "id": "spa",
        "label": "Spa"
      },
    ]
  }
}