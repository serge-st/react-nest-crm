import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./userRole.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        length: 20, 
        unique: true,
    })
    username: string;

    @Column()
    password: string;
    
    @ManyToOne(() => UserRole, (userRole) => userRole.id, {nullable: false})
    @JoinColumn({name: 'roleId'})
    roleId: UserRole;

    @Column({
        default: true,
    })
    isEnabled: boolean;
    
    @Column({
        nullable: true,
    })
    fullName: string;
    
    @Column({
        nullable: true,
    })
    email: string;
}
