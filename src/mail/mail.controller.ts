import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { SubscriberDocument, Subscriber } from 'src/subscribers/schemas/subscriber.schemas';
import { Job, JobDocument } from 'src/jobs/schemas/job.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,

    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,

    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) { }

  @Get()
  @Public()
  @Cron(CronExpression.EVERY_WEEKEND)
  @ResponseMessage("Test email")
  async handleTestEmail() {

    const subscribers = await this.subscriberModel.find({})
    for (const subs of subscribers) {
      const subsSkills = subs.skills
      const jobWithMatchingSkills = await this.jobModel.find({ skills: { $in: subsSkills } })
      if (jobWithMatchingSkills?.length) {
        const jobs = jobWithMatchingSkills.map(item => {
          return {
            name: item.name,
            company: item.company.name,
            salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
            skills: item.skills
          }
        })
        await this.mailerService.sendMail({
          to: "2ez4aw@gmail.com",
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: "job", //Tên của file .hbs trong thư mục template
          context: {
            receiver: subs.name,
            jobs: jobs
          }
        });
      }
    }
  }
}
