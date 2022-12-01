import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./userRole.entity";

@Entity('users')
@Index(['username'], { unique: true })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        length: 20,
    })
    username: string;

    @Column({
    })
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
