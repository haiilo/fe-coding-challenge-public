import { HttpStatusCode } from '@angular/common/http';

export const ERROR_MESSAGES: Partial<Record<HttpStatusCode, string>> = {
	[HttpStatusCode.InternalServerError]:
		"We have a problem! It's not you, it's us.\nTry getting new data by pressing below button or refreshing page! 💡",
};
