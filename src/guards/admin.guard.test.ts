import { AdminGuard } from "./admin.guard"
import { Reflector } from "@nestjs/core"
import { Test, TestingModule } from "@nestjs/testing";
describe("Admin guard", () => {
    let guard: AdminGuard;
    let reflector: Reflector

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AdminGuard,
                {
                    provide: Reflector,
                    useValue: {
                        context: jest.fn(),
                        switchToHttp: jest.fn(),
                        getRequest: jest.fn()
                    }
                }
            ]
        }).compile()

        guard = module.get<AdminGuard>(AdminGuard)
        reflector = module.get<Reflector>(Reflector)

    })

    afterEach(async () => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });
})