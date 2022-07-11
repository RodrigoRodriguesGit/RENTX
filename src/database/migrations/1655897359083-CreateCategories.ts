import {MigrationInterface, QueryRunner} from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

export class CreateCategories1655897359083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
    
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }

}