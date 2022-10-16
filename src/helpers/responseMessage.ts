import { IResponseData } from './../interfaces/utils.interface';
const responseMessage = (message: string, data: IResponseData | null = null) => {
    const response = {
        success: true,
        message,
        data
    };
    return response;
};

export default responseMessage;
