import {App, moment, normalizePath, TFile} from "obsidian";
import {DataviewApi} from "obsidian-dataview/lib/api/plugin-api";
import {getAPI} from "obsidian-dataview";
import {DayMetadata_Latest} from "./src/dailData_version";
import yaml from "js-yaml";


export class DataFile implements DayMetadata_Latest{
	dsp_averageTime: number = 0;
	dsp_exercises: number = 0;
	dsp_total_time: number = 0;

	math_averageTime: number = 0;
	math_exercises: number = 0;
	math_total_time: number = 0;

	politics_averageTime: number = 0;
	politics_exercises: number = 0;
	politics_total_time: number = 0;

	totoal_focus_time: number = 0;


	app_: App;
	dv_: DataviewApi | undefined;

	constructor(app:App, dailydata?: DayMetadata_Latest) {
		this.app_ = app;
		this.dv_ = getAPI();
		Object.assign(this, dailydata);
	}

	// stringify(): string

	toYaml(obj: Object, excluded_key = "_"): string {
		const sanitizedObject = Object.fromEntries(
			Object.entries(obj).filter(([key]) => !key.endsWith(excluded_key))
		);
		return `---\n${yaml.dump(sanitizedObject)}---`;
	}

	static get path(){
		const date_string = moment().format('YYYYMMDD');
		return normalizePath(`🗓️Daily notes/DATA-${date_string}.md`);
	}

	get path(){
		const date_string = moment().format('YYYYMMDD');
		return normalizePath(`🗓️Daily notes/DATA-${date_string}.md`);
	}

	async save(){
		const content = this.toYaml(this,"_")
		await this.app_.vault.adapter.write(normalizePath(this.path), content);
	}

	static fromFrontmatter(app:App, data: DayMetadata_Latest): DataFile {
		return new DataFile(app, data);
	}


}
