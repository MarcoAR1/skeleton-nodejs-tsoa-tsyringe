import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, SuccessResponse, Tags } from 'tsoa'
import { inject, injectable } from 'tsyringe'
import { ItemService } from '../application/services/ItemService'
import { CreateItemInput, Item, UpdateItemInput } from '../domain/entities/Item'

/**
 * ItemController — ENTRYPOINT layer.
 * THIN: validates/extracts input, delegates to the service, returns the result.
 * ZERO business logic here.
 */
@injectable()
@Route('items')
@Tags('Items')
export class ItemController extends Controller {
  constructor(@inject(ItemService) private readonly itemService: ItemService) {
    super()
  }

  @Get('/')
  public async list(): Promise<Item[]> {
    return this.itemService.list()
  }

  @Get('{id}')
  public async getById(@Path() id: string): Promise<Item> {
    return this.itemService.getById(id)
  }

  @Post('/')
  @SuccessResponse(201, 'Created')
  public async create(@Body() body: CreateItemInput): Promise<Item> {
    const item = await this.itemService.create(body)
    this.setStatus(201)
    return item
  }

  @Put('{id}')
  public async update(@Path() id: string, @Body() body: UpdateItemInput): Promise<Item> {
    return this.itemService.update(id, body)
  }

  @Delete('{id}')
  @Security('jwt')
  @SuccessResponse(204, 'No Content')
  public async remove(@Path() id: string): Promise<void> {
    await this.itemService.remove(id)
    this.setStatus(204)
  }
}
