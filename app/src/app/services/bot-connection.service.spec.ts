import { TestBed } from '@angular/core/testing';

import { BotConnectionService } from './bot-connection.service';

describe('BotConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotConnectionService = TestBed.get(BotConnectionService);
    expect(service).toBeTruthy();
  });
});
