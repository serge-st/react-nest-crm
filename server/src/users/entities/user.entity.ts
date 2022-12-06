import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

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
    @Exclude()
    password: string;
    
    @ManyToOne(() => Role, (role) => role.id, {nullable: false, eager: true})
    @JoinColumn({name: 'role'})
    role: Role;

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
