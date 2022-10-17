import moment from 'moment';
import config from '../../config/constant';
import tokenService from '../../services/token.service';

const accessTokenExpires = moment().add(config.jwtAcessExpirationMinutes, 'minutes');

const getAcessToken  = async (id: string) => {
  return tokenService.generateToken(id, accessTokenExpires, "access");
};

export default getAcessToken;