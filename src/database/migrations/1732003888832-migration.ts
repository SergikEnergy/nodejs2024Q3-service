import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732003888832 implements MigrationInterface {
    name = 'Migration1732003888832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favs" ("id" SERIAL NOT NULL, CONSTRAINT "PK_2fde25c80bd089c0fa0e7986409" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favs_artists" ("favsId" integer NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_55457e38bc2ef5367bbcd9ecb0d" PRIMARY KEY ("favsId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f45db6811a5fc364c282d3ed9c" ON "favs_artists" ("favsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_08f8a0882594d24d359545372b" ON "favs_artists" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favs_albums" ("favsId" integer NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_e457130a771a9b3282a18ce429c" PRIMARY KEY ("favsId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03ff3ba03523e9c95294fb0395" ON "favs_albums" ("favsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ae8008eca87227ab48a6603d58" ON "favs_albums" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favs_tracks" ("favsId" integer NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_4d0ff4f8775a38289cdbb35d43e" PRIMARY KEY ("favsId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d8be7501f238ed548ace2ab42" ON "favs_tracks" ("favsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_07ed537531349b00cfd8c58919" ON "favs_tracks" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favs_artists" ADD CONSTRAINT "FK_f45db6811a5fc364c282d3ed9c0" FOREIGN KEY ("favsId") REFERENCES "favs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favs_artists" ADD CONSTRAINT "FK_08f8a0882594d24d359545372b0" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favs_albums" ADD CONSTRAINT "FK_03ff3ba03523e9c95294fb03953" FOREIGN KEY ("favsId") REFERENCES "favs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favs_albums" ADD CONSTRAINT "FK_ae8008eca87227ab48a6603d586" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favs_tracks" ADD CONSTRAINT "FK_5d8be7501f238ed548ace2ab42c" FOREIGN KEY ("favsId") REFERENCES "favs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favs_tracks" ADD CONSTRAINT "FK_07ed537531349b00cfd8c58919d" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favs_tracks" DROP CONSTRAINT "FK_07ed537531349b00cfd8c58919d"`);
        await queryRunner.query(`ALTER TABLE "favs_tracks" DROP CONSTRAINT "FK_5d8be7501f238ed548ace2ab42c"`);
        await queryRunner.query(`ALTER TABLE "favs_albums" DROP CONSTRAINT "FK_ae8008eca87227ab48a6603d586"`);
        await queryRunner.query(`ALTER TABLE "favs_albums" DROP CONSTRAINT "FK_03ff3ba03523e9c95294fb03953"`);
        await queryRunner.query(`ALTER TABLE "favs_artists" DROP CONSTRAINT "FK_08f8a0882594d24d359545372b0"`);
        await queryRunner.query(`ALTER TABLE "favs_artists" DROP CONSTRAINT "FK_f45db6811a5fc364c282d3ed9c0"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07ed537531349b00cfd8c58919"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d8be7501f238ed548ace2ab42"`);
        await queryRunner.query(`DROP TABLE "favs_tracks"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae8008eca87227ab48a6603d58"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03ff3ba03523e9c95294fb0395"`);
        await queryRunner.query(`DROP TABLE "favs_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08f8a0882594d24d359545372b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f45db6811a5fc364c282d3ed9c"`);
        await queryRunner.query(`DROP TABLE "favs_artists"`);
        await queryRunner.query(`DROP TABLE "favs"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
