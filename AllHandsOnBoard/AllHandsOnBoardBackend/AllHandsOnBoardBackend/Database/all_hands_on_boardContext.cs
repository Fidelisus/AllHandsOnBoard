using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AllHandsOnBoardBackend
{
    public partial class all_hands_on_boardContext : DbContext
    {
        public all_hands_on_boardContext()
        {
        }

        public all_hands_on_boardContext(DbContextOptions<all_hands_on_boardContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TaskAggregation> TaskAggregation { get; set; }
        public virtual DbSet<Tasks> Tasks { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=all_hands_on_board;Username=admin;Password=admin");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskAggregation>(entity =>
            {
                entity.HasKey(e => e.AggegationId);

                entity.ToTable("task_aggregation");

                entity.Property(e => e.AggegationId).HasColumnName("aggegation_id");

                entity.Property(e => e.TaskId).HasColumnName("task_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskAggregation)
                    .HasForeignKey(d => d.TaskId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("task_aggregation_task_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TaskAggregation)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("task_aggregation_user_id_fkey");
            });

            modelBuilder.Entity<Tasks>(entity =>
            {
                entity.HasKey(e => e.TaskId);

                entity.ToTable("tasks");

                entity.Property(e => e.TaskId).HasColumnName("task_id");

                entity.Property(e => e.NoOfStudents).HasColumnName("no_of_students");

                entity.Property(e => e.PointsGained).HasColumnName("points_gained");

                entity.Property(e => e.ShortDescription)
                    .HasColumnName("short_description")
                    .HasMaxLength(50);

                entity.Property(e => e.SigningFinishDate).HasColumnName("signing_finish_date");

                entity.Property(e => e.Stateoftask)
                    .HasColumnName("stateoftask")
                    .HasMaxLength(4)
                    .HasDefaultValueSql("'TODO'::character varying");

                entity.Property(e => e.Tag)
                    .HasColumnName("tag")
                    .HasMaxLength(30);

                entity.Property(e => e.TaskDescription)
                    .HasColumnName("task_description")
                    .HasMaxLength(400);

                entity.Property(e => e.UploadDate)
                    .HasColumnName("upload_date")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.UploaderId).HasColumnName("uploader_id");

                entity.Property(e => e.WorkFinishDate).HasColumnName("work_finish_date");

                entity.Property(e => e.WorkStartDate).HasColumnName("work_start_date");

                entity.HasOne(d => d.Uploader)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.UploaderId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("tasks_uploader_id_fkey");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("users");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.AcademicTitle)
                    .HasColumnName("academic_title")
                    .HasMaxLength(20);

                entity.Property(e => e.Department)
                    .HasColumnName("department")
                    .HasMaxLength(30);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(30);

                entity.Property(e => e.IndexNo).HasColumnName("index_no");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);

                entity.Property(e => e.Occupation)
                    .IsRequired()
                    .HasColumnName("occupation")
                    .HasMaxLength(20);

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname")
                    .HasMaxLength(30);

                entity.Property(e => e.Password).HasColumnName("password");

                entity.Property(e => e.Token).HasColumnName("token");
            });
        }
    }
}
