import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    service = new ConfigService(`.env.local`);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return PORT', async () => {
      expect(await service.get('PORT')).toBe('3001');
    });
  });
});
