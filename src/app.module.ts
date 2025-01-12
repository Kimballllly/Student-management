import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'paperazzi.cre40o0wmfru.ap-southeast-2.rds.amazonaws.com', // Change to your database host
      port: 3306, // MySQL default port
      username: 'admin', // Your MySQL username
      password: 'paperazzi', // Your MySQL password
      database: 'student_db', // Your database name
      autoLoadEntities: true,
      synchronize: true, // Automatically sync entities with DB (disable in production)
    }),
    StudentModule,
  ],
})
export class AppModule {}