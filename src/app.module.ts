import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { SeasonModule } from './season/season.module';
import { RaceModule } from './race/race.module';
import { StandingsModule } from './standings/standings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }),
    SeasonModule,
    RaceModule,
    StandingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
